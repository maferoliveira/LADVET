import 'package:flutter/material.dart';
import 'package:flutter_ladvet/ui/configuracao.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LadVet App',
      theme: ThemeData(
        primarySwatch: Colors.pink,
        scaffoldBackgroundColor: const Color(0xFFF3E2E5), // Fundo rosado claro
      ),
      home: const ContatosPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class ContatosPage extends StatelessWidget {
  const ContatosPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFD49A9F), // Tom rosado do cabeçalho
        elevation: 0,
       leading: IconButton(
  icon: const Icon(Icons.arrow_back, color: Colors.white),
  onPressed: () {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (context) => const ConfiguracaoPage(),
      ),
    );
  },
),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Foto principal do topo (cachorroscontato.jpeg)
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  height: 180,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey.shade400),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Image.asset(
                    'assets/cachorroscontato.jpeg',
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Cards de Contatos (Rolagem Horizontal)
              SizedBox(
                height: 120,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: [
                    _buildContactCard(
                      name: 'Letícia Corrêa\nda Silva',
                      phone: '(19) 97158-3462',
                      email: 'leticia.correa@hotm',
                      imagePath: 'assets/leticia.jpeg',
                    ),
                    const SizedBox(width: 12),
                    _buildContactCard(
                      name: 'Maria Fernanda\nMoraes de Oliveira',
                      phone: '(19) 97169-3072',
                      email: 'maria.fernanda@ho',
                      imagePath: 'assets/mafer.jpeg',
                    ),
                    const SizedBox(width: 12),
                    _buildContactCard(
                      name: 'Marina Defendi',
                      phone: '(19) 99696-0747',
                      email: 'defendi.marina@hot',
                      imagePath: 'assets/marina.jpeg',
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Ícones de Redes Sociais
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildSocialIcon(Icons.phone, Colors.green),
                  const SizedBox(width: 20),
                  _buildSocialIcon(Icons.facebook, Colors.blue),
                  const SizedBox(width: 20),
                  _buildSocialIcon(Icons.camera_alt, Colors.purple),
                ],
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  // Widget auxiliar para cada card de contato
  Widget _buildContactCard({
    required String name,
    required String phone,
    required String email,
    required String imagePath,
  }) {
    return Container(
      width: 210,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 5,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Foto de perfil circular
          Container(
            width: 45,
            height: 45,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: Colors.grey.shade400),
              image: DecorationImage(
                image: AssetImage(imagePath),
                fit: BoxFit.cover,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  name,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  phone,
                  style: const TextStyle(fontSize: 10, color: Colors.black54),
                ),
                const SizedBox(height: 2),
                Text(
                  email,
                  style: const TextStyle(fontSize: 9, color: Colors.black45),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Widget auxiliar para os ícones de redes sociais
  Widget _buildSocialIcon(IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 6,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Icon(icon, color: color, size: 26),
    );
  }
}