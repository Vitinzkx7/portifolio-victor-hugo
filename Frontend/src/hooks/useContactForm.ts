import { useState } from 'react';
import type { ContactFormData } from '../types';

interface UseContactFormReturn {
  formData: ContactFormData;
  loading: boolean;
  success: boolean;
  error: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um e-mail válido.');
      setLoading(false);
      return;
    }

    try {
      // 1. Enviar para o backend local (salvar no banco de dados)
      const backendResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      // 2. Enviar para o Web3Forms (notificação por email)
      const web3FormsFormData = new FormData();
      web3FormsFormData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "");
      web3FormsFormData.append("name", formData.name);
      web3FormsFormData.append("email", formData.email);
      web3FormsFormData.append("subject", formData.subject || "Nova Mensagem de Contato (Portfólio)");
      web3FormsFormData.append("message", formData.message);

      const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormsFormData
      });

      let backendResult;
      try {
        backendResult = await backendResponse.json();
      } catch (e) {
        backendResult = { success: backendResponse.ok };
      }
      
      const web3FormsResult = await web3FormsResponse.json();
      console.log("Web3Forms Response:", web3FormsResult);

      // Consideramos sucesso se o Web3Forms funcionou e o backend não retornou um erro óbvio
      if ((backendResult.success || backendResponse.ok) && web3FormsResult.success) {
        setSuccess(true);
        setFormData(initialFormData);
      } else {
        // Se deu erro no Web3Forms, exibe a mensagem retornada pela própria API para facilitar o debug
        if (!web3FormsResult.success) {
          setError(`Erro no email (Web3Forms): ${web3FormsResult.message || 'Falha ao enviar'}`);
        } else {
          setError('Erro ao salvar no banco de dados. Tente novamente.');
        }
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSuccess(false);
    setError(null);
  };

  return {
    formData,
    loading,
    success,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
