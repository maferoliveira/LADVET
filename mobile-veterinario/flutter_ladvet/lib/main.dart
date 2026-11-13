import 'package:flutter/material.dart';
import 'ui/adocao.dart';

void main() {
  runApp(LadVetApp());
}

class LadVetApp extends StatelessWidget {
  const LadVetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LADVET',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: true, fontFamily: 'Georgia'),
      home: const AdocaoPage(),
      routes: {},
    );
  }
}
