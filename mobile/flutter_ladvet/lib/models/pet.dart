import 'package:flutter/material.dart';

class Pet {
  final String nome;
  final String idade;
  final String especie;
  final IconData icon;
  final String? imagePath;

  const Pet({
    required this.nome,
    required this.idade,
    required this.especie,
    required this.icon,
    this.imagePath,
  });
}
