
-- -----------------------------------------------------
-- Seed `skills`
-- -----------------------------------------------------
INSERT IGNORE INTO skills (name, category, proficiency_level) VALUES 
('Python', 'Data Engineering', 5),
('MySQL', 'Database', 4),
('MongoDB', 'Database', 4),
('Docker', 'DevOps', 3),
('Git', 'Tools', 5),
('Java', 'Backend', 4),
('Spring Boot', 'Backend', 4),
('React', 'Frontend', 3),
('TypeScript', 'Frontend', 3);

-- -----------------------------------------------------
-- Seed `projects`
-- -----------------------------------------------------
INSERT IGNORE INTO projects (name, description, repository_url, live_demo_url) VALUES 
('Portfólio Pessoal', 'Projeto desenvolvido em React, Spring Boot e MySQL com integração ao Web3Forms e Github API.', 'https://github.com/Vitinzkx7/portifolio', 'https://seulinkhere.com');

-- -----------------------------------------------------
-- Seed `users`
-- -----------------------------------------------------
-- Default Admin User (Password would be hashed via BCrypt in reality, using plain text just for structural demonstration, DO NOT use plain text passwords in production)
INSERT IGNORE INTO users (username, password, email) VALUES 
('admin_victor', 'admin123', 'victornex2006@hotmail.com');
