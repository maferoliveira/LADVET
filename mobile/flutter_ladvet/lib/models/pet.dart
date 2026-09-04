import 'package:flutter/material.dart';

class Pet {
  const Pet({
    required this.id,
    required this.nome,
    required this.idade,
    required this.especie,
    required this.sexo,
    required this.vacinas,
    required this.temperamento,
    required this.descricao,
    required this.status,
    required this.icon,
    this.imagePath,
  });

  final int id;
  final String nome;
  final String idade;
  final String especie;
  final String sexo;
  final String vacinas;
  final String temperamento;
  final String descricao;
  final String status;
  final IconData icon;
  final String? imagePath;
}
