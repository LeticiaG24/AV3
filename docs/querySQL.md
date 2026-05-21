USE aerocode;
-- =========================
-- AERONAVES
-- =========================
INSERT INTO Aeronave (codigo, modelo, tipo, capacidade, alcance)
VALUES
('AER001', 'Boeing 737', 'Comercial', 180, 5600),
('AER002', 'Airbus A320', 'Comercial', 170, 6100),
('AER003', 'F-22 Raptor', 'Militar', 1, 2960);

-- =========================
-- FUNCIONÁRIOS
-- =========================

INSERT INTO Funcionario (nome, telefone, endereco, usuario, senha, nivelPermissao)
VALUES
('Carlos Silva', '11999990001', 'Rua A, 100', 'carlos', '123456', 'Admin'),
('Marina Souza', '11999990002', 'Rua B, 200', 'marina', '123456', 'Engenheiro'),
('João Lima', '11999990003', 'Rua C, 300', 'joao', '123456', 'Operador');

-- =========================
-- ETAPAS
-- =========================

INSERT INTO Etapa (nome, prazo, status, aeronaveId)
VALUES
('Montagem da fuselagem', '2026-06-01', 'Andamento', 1),
('Instalação elétrica', '2026-06-10', 'Pendente', 1),
('Teste estrutural', '2026-06-20', 'Concluida', 2);

-- =========================
-- PEÇAS
-- =========================

INSERT INTO Peca (nome, tipo, status, fornecedor, aeronaveId)
VALUES
('Turbina X1', 'Importada', 'EmTransporte', 'GE Aviation', 1),
('Asa Direita', 'Nacional', 'Pronta', 'Embraer Parts', 1),
('Sistema Hidráulico', 'Importada', 'EmProducao', 'HydroTech', 2),
('Radar Militar', 'Importada', 'Pronta', 'Lockheed Martin', 3);

-- =========================
-- TESTES
-- =========================

INSERT INTO Teste (tipo, resultado, aeronaveId)
VALUES
('Eletrico', 'Aprovado', 1),
('Hidraulico', 'Reprovado', 2),
('Aerodinamico', 'Aprovado', 3);

-- =========================
-- RELAÇÃO FUNCIONARIO <-> ETAPA
-- (tabela many-to-many criada pelo Prisma)
-- =========================

INSERT INTO _EtapaToFuncionario (A, B)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);
