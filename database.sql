CREATE DATABASE mundo;

USE mundo;

CREATE TABLE continentes(
id int primary key auto_increment,
nome varchar(100),
descricao varchar(100)
);

CREATE TABLE paises(
id int primary key auto_increment,
nome varchar(100),
populacao int,
idioma_ofc varchar(100),
moeda varchar(100),
id_continente int not null,
constraint fk_id_continente foreign key (id_continente) references continentes(id)
);

CREATE TABLE cidades(
id int primary key auto_increment,
nome varchar(100),
populacao int,
latitude varchar(100),
longitude varchar(100),
id_pais int not null,
constraint fk_id_pais foreign key (id_pais) references paises(id)
);