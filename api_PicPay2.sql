create database api_PicPay2;
use api_PicPay2;
#drop database api_PicPay2;

create table banco (
    id int not null auto_increment primary key,
    nome_fantasia varchar (200) not null,
    razao_social varchar (200) not null,
    cnpj varchar (20) not null,
    numero varchar(3) not null
);

INSERT INTO banco VALUES (null, 'Banco PicPay2', 'PicPay2 S/A', '01.234.567/0001-89', 123); 
INSERT INTO banco VALUES (null, 'Banco Inter2', 'Inter2 S/A', '01.234.567/0001-46', 456); 
INSERT INTO banco VALUES (null, 'Nubank2', 'Nubank2 S/A', '01.234.567/0001-79', 789); 
INSERT INTO banco VALUES (null, 'Banco RBD', 'RBD Financeira Ltda', '01.234.567/0001-11', 101); 
INSERT INTO banco VALUES (null, 'Banco Forte Caixa', 'Forte Caixa Finan Ltda', '01.234.567/0001-91', 951); 
INSERT INTO banco VALUES (null, 'Banco Cofre', 'Cofre Ltda', '01.234.567/0001-53', 753); 
INSERT INTO banco VALUES (null, 'Banco Máximo', 'Financeira Máximo S/A', '01.234.567/0001-53', 519); 
INSERT INTO banco VALUES (null, 'Banco Economia', 'Economia Ltda', '01.234.567/0001-53', 642); 
INSERT INTO banco VALUES (null, 'Banco Money', 'Money S/A', '01.234.567/0001-53', 468); 
INSERT INTO banco VALUES (null, 'Banco Carteira', 'Carteira Ltda', '01.234.567/0001-53', 397); 

create table agencia (
    id int not null auto_increment primary key,
    numero varchar (100) not null,
    nome_fantasia varchar (200) not null,
    razao_social varchar (200) not null,
    cnpj varchar (20) not null,
    telefone varchar (200),
    email varchar (200),
    ban_id int not null,
    foreign key (ban_id) references banco (id)
);

INSERT INTO agencia VALUES (null,"11" ,'Agência PicPay2', 'PicPay2 S/A', '01.234.567/0001-89', '(11) 0800-0008', 'contato@picpay2.com', 1); 
INSERT INTO agencia VALUES (null, "12" ,'Agência Inter2', 'Inter2 S/A', '01.234.567/0001-46',null, null, 2); 
INSERT INTO agencia VALUES (null, "12" ,'Agência Nubank2', 'Nubank2 S/A', '01.234.567/0001-79', null, null, 3); 
INSERT INTO agencia VALUES (null, "12" ,'Agência RBD', 'RBD Financeira Ltda', '01.234.567/0001-11', null, null, 4); 
INSERT INTO agencia VALUES (null,"12"  ,'Agência Forte Caixa', 'Forte Caixa Finan Ltda', '01.234.567/0001-91', null, null, 5); 
INSERT INTO agencia VALUES (null,"12"  ,'Agência Cofre', 'Cofre Ltda', '01.234.567/0001-53', null, null, 6); 
INSERT INTO agencia VALUES (null,"12"  ,'Agência Máximo', 'Financeira Máximo S/A', '01.234.567/0001-53', null, null, 7); 
INSERT INTO agencia VALUES (null,"12"  ,'Agência Economia', 'Economia Ltda', '01.234.567/0001-53', null, null, 8); 
INSERT INTO agencia VALUES (null, "12" ,'Agência Money', 'Money S/A', '01.234.567/0001-53',null, null, 9);
INSERT INTO agencia VALUES (null,"12"  ,'Agência Carteira', 'Carteira Ltda', '01.234.567/0001-53', null, null, 10);  

create table cliente (
    id int not null auto_increment primary key,
    nome varchar (200) not null,
    cpf_cnpj varchar (50) not null,
    rg varchar (100) not null,
    sexo varchar (1) not null,
    data_nascimento date not null,
    renda decimal(12, 2) not null,
    endereco varchar (300) not null,
    email varchar (300) not null,
    telefone varchar (200) not null
);

INSERT INTO cliente VALUES (null, 'Lorena Etiene', '001.002.003-45', '1234567', 'F', '1999-10-24', 3500, 'R. Monte Castelo, 1567', 'lorena@gmail.com', '(69)99275-8967');
INSERT INTO cliente VALUES (null, 'João Felipe', '004.005.006-78', '216813', 'M', '2004-05-12', 4000, 'Av. Ji-Paraná, 2158', 'joao@gmail.com', '(69)99264-4115');
INSERT INTO cliente VALUES (null, 'Cleia Marta', '007.001.009-12', '1564872', 'F', '1974-11-29', 3000, 'R. Monte Castelo, 1567', 'cleia@gmail.com', '(69)99361-9475');
INSERT INTO cliente VALUES (null, 'Milena Sousa', '009.008.009-60', '1564872', 'F', '2000-12-31', 1000, 'R. Monte Castelo, 1567', 'milena@gmail.com', '(69)99258-3641');
INSERT INTO cliente VALUES (null, 'Ketlen Lorrana', '002.006.009-84', '1564872', 'F', '1974-11-29', 7000, 'R. Céu Azul, 1895', 'ketlen@gmail.com', '(69)99351-4788');
INSERT INTO cliente VALUES (null, 'Gabriel Brondolo', '003.009.009-73', '1564872', 'M', '1974-11-29', 4500, 'Av. Marechal Rondon, 1297', 'gabriel@gmail.com', '(69)99332-5412');
INSERT INTO cliente VALUES (null, 'Larissa Barreto', '004.007.009-27', '1564872', 'F', '1974-11-29', 3500, 'R. das Flores, 1364', 'larissa@gmail.com', '(69)99264-9786');
INSERT INTO cliente VALUES (null, 'Tauane Oliveira', '008.003.009-36', '1564872', 'F', '1974-11-29', 5000, 'R. Buritis, 1798', 'tauane@gmail.com', '(69)99391-8833');
INSERT INTO cliente VALUES (null, 'Joel Alves', '001.008.009-85', '1564872', 'M', '1974-11-29', 1500, 'R. Castro Alves, 1396', 'joel@gmail.com', '(69)999267-5972');
INSERT INTO cliente VALUES (null, 'Maria Valentim', '002.004.009-18', '1564872', 'F', '1974-11-29', 1500, 'R. Castro Alves, 1396', 'maria@gmail.com', '(69)99266-7589');

create table conta (
    id int not null auto_increment primary key,
    numero int not null,
    data_abertura date not null,
    saldo decimal(12, 2),
    tipo varchar(100),
    sigla_tipo varchar (2),
    valor_limite decimal(12, 2),
    saldo_Limite decimal(12, 2),
    agencia_id int not null,
    cliente_id int not null,
    foreign key (agencia_id) references agencia (id),
    foreign key (cliente_id) references cliente (id)
);

INSERT INTO conta VALUES (null, 26548, '2023-06-10', '5000', 'Conta Corrente', 'CC', null, null, 1, 1);
INSERT INTO conta VALUES (null, 69857, '2023-06-10', '5000', 'Conta Poupança', 'CP', null, null, 2, 2);
INSERT INTO conta VALUES (null, 584986, '2023-05-18', '3000', 'Conta Corrente', 'CC', null, null, 3, 3);
INSERT INTO conta VALUES (null, 793416, '2023-05-20', '500', 'Conta Poupança', 'CP', null, null, 4, 4);
INSERT INTO conta VALUES (null, 958413, '2023-05-20', '7000', 'Conta Poupança', 'CC', null, null, 5, 5);
INSERT INTO conta VALUES (null, 841849, '2023-06-04', '5000', 'Conta Poupança', 'CC', null, null, 6, 6);
INSERT INTO conta VALUES (null, 328498, '2023-06-04', '9000', 'Conta Poupança', 'CC', null, null, 7, 7);
INSERT INTO conta VALUES (null, 238914, '2023-06-06', '7500', 'Conta Poupança', 'CC', null, null, 8, 8);
INSERT INTO conta VALUES (null, 198741, '2023-06-06', '1000', 'Conta Poupança', 'CP', null, null, 9, 9);
INSERT INTO conta VALUES (null, 198645, '2023-06-06', '1500', 'Conta Poupança', 'CP', null, null, 10, 10);

create table deposito (
    id int not null auto_increment primary key,
    valor decimal(12, 2) not null,
    data_hora datetime not null,
    conta_id int not null,
    foreign key (conta_id) references conta (id)
);

INSERT INTO deposito VALUES (null, 1200.00, '2023-06-15', 1);
INSERT INTO deposito VALUES (null, 700.00, '2023-06-15', 2);
INSERT INTO deposito VALUES (null, 650.00, '2023-06-16', 3);
INSERT INTO deposito VALUES (null, 100.00, '2023-06-16', 4);
INSERT INTO deposito VALUES (null, 2000.00, '2023-06-14', 5);
INSERT INTO deposito VALUES (null, 600.00, '2023-06-14', 6);
INSERT INTO deposito VALUES (null, 2000.00, '2023-06-13', 7);
INSERT INTO deposito VALUES (null, 1500.00, '2023-06-13', 8);
INSERT INTO deposito VALUES (null, 300.00, '2023-06-12', 9);
INSERT INTO deposito VALUES (null, 400.00, '2023-06-12', 10);


create table saque (
    id int not null auto_increment primary key,
    valor decimal(12, 2) not null,
    data_hora datetime not null,
    conta_id int not null,
    foreign key (conta_id) references conta (id)
);

INSERT INTO saque VALUES (null, 1200.00, '2023-06-15 08:30:00', 1);
INSERT INTO saque VALUES (null, 800.00, '2023-06-15 08:30:00', 2);
INSERT INTO saque VALUES (null, 650.00, '2023-06-16 09:23:00', 3);
INSERT INTO saque VALUES (null, 100.00, '2023-06-16 09:23:00', 4);
INSERT INTO saque VALUES (null, 2000.00, '2023-06-14 10:00:00', 5);
INSERT INTO saque VALUES (null, 600.00, '2023-06-14 10:00:00', 6);
INSERT INTO saque VALUES (null, 2000.00, '2023-06-13 10:51:00', 7);
INSERT INTO saque VALUES (null, 1500.00, '2023-06-13 10:51:00', 8);
INSERT INTO saque VALUES (null, 300.00, '2023-06-12 09:00:00', 9);
INSERT INTO saque VALUES (null, 400.00, '2023-06-12 09:00:00', 10);

create table transferencia (
    id int not null auto_increment primary key,
    valor decimal(12, 2) not null,
    data_hora datetime not null,
    descricao varchar (100),
    conta_origem_id int not null,
    conta_destino_id int not null,
    foreign key (conta_origem_id) references conta (id),
    foreign key (conta_destino_id) references conta (id)
);

INSERT INTO transferencia VALUES (null, 550.00, '2023-06-15 09:30:00', null, 1, 3);
INSERT INTO transferencia VALUES (null, 500.00, '2023-06-15 09:30:00', null, 2, 9);
INSERT INTO transferencia VALUES (null, 200.00, '2023-06-16 10:23:00', null, 3, 10);
INSERT INTO transferencia VALUES (null, 100.00, '2023-06-16 10:23:00', null, 4, 5);
INSERT INTO transferencia VALUES (null, 1000.00, '2023-06-14 11:00:00', null, 5, 1);
INSERT INTO transferencia VALUES (null, 230.00, '2023-06-14 11:00:00', null, 6, 1);
INSERT INTO transferencia VALUES (null, 150.00, '2023-06-13 12:51:00', null, 7, 2);
INSERT INTO transferencia VALUES (null, 750.00, '2023-06-13 12:51:00', null, 8, 3);
INSERT INTO transferencia VALUES (null, 300.00, '2023-06-12 10:00:00', null, 9, 3);
INSERT INTO transferencia VALUES (null, 400.00, '2023-06-12 10:00:00', null, 10, 3);

