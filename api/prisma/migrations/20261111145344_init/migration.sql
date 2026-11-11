-- CreateEnum
CREATE TYPE "tipoUsuario" AS ENUM ('ADOTANTE', 'CLINICA');

-- CreateEnum
CREATE TYPE "statusAnimal" AS ENUM ('DISPONIVEL', 'EM_PROCESSO', 'ADOTADO');

-- CreateEnum
CREATE TYPE "statusAdocao" AS ENUM ('PENDENTE', 'APROVADA', 'RECUSADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT,
    "endereco" TEXT,
    "bairro" TEXT,
    "numero" TEXT,
    "tipo_usuario" "tipoUsuario" NOT NULL,
    "residencia" TEXT,
    "espaco" TEXT,
    "experiencia" TEXT,
    "rotina" TEXT,
    "crmv" TEXT,
    "validado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL DEFAULT 'Não informado',
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "porte" TEXT NOT NULL DEFAULT 'Não informado',
    "temperamento" TEXT,
    "descricao" TEXT,
    "foto" TEXT NOT NULL,
    "status" "statusAnimal" NOT NULL DEFAULT 'DISPONIVEL',
    "usuarioID" INTEGER NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataAplicacao" TIMESTAMP(3) NOT NULL,
    "proximaDose" TIMESTAMP(3),
    "veterinario" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "animalID" INTEGER NOT NULL,

    CONSTRAINT "Vacina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id" SERIAL NOT NULL,
    "moradia" TEXT NOT NULL,
    "temQuintal" BOOLEAN NOT NULL,
    "experiencia" TEXT,
    "motivo" TEXT NOT NULL,
    "tempoDisponivel" TEXT NOT NULL,
    "status" "statusAdocao" NOT NULL DEFAULT 'PENDENTE',
    "animalID" INTEGER NOT NULL,
    "adotanteID" INTEGER NOT NULL,

    CONSTRAINT "Adocao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacina" ADD CONSTRAINT "Vacina_animalID_fkey" FOREIGN KEY ("animalID") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_animalID_fkey" FOREIGN KEY ("animalID") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotanteID_fkey" FOREIGN KEY ("adotanteID") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
