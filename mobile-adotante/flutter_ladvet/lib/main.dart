import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'ui/favoritos.dart';
import 'ui/home.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (!kIsWeb) {
    await FavoritosController.inicializar();
  }
  runApp(const LadVetApp());
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
