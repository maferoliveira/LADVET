import 'package:flutter/material.dart';
import 'ui/home.dart';

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
      home: HomePage(),
      routes: {},
    );
  }
}
