import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Perfil',
      theme: ThemeData(fontFamily: 'Roboto'),
      home: const PerfilPage(),
    );
  }
}

class PerfilPage extends StatelessWidget {
  const PerfilPage({super.key});

  // Paleta de cores baseada na imagem
  static const Color corCabecalho = Color(0xFFC17B79); // rosa terroso do topo
  static const Color corFundo = Color(0xFFFCEEEF); // rosa bem claro do fundo
  static const Color corBotao = Color(
    0xFF6B7593,
  ); // azul acinzentado dos botões
  static const Color corTextoTitulo = Color(0xFF4A4A4A);
  static const Color corTextoSubtitulo = Color(0xFF8A8A8A);
  static const Color corLinkRodape = Color(0xFFC17B79);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: corFundo,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _buildCabecalho(context),
            const SizedBox(height: 12),
            const Text(
              'Silmara oliveira',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: corTextoTitulo,
              ),
            ),
            const SizedBox(height: 2),
            const Text(
              'Adotante',
              style: TextStyle(fontSize: 14, color: corTextoSubtitulo),
            ),
            const SizedBox(height: 16),
            const Divider(
              thickness: 1,
              indent: 24,
              endIndent: 24,
              color: Color(0xFFE3CFCF),
            ),
            const SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                children: [
                  Expanded(
                    child: _BotaoMenu(
                      icone: Icons.chevron_left,
                      texto: 'Cadastro de\nanimais',
                      onTap: () {},
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _BotaoMenu(
                      icone: Icons.settings,
                      texto: 'Senha',
                      onTap: () {},
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 16),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                children: [
                  Expanded(
                    child: _BotaoMenu(
                      icone: Icons.people_alt_outlined,
                      texto: 'Contatos',
                      onTap: () {},
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: _BotaoMenu(
                      icone: Icons.favorite_border,
                      texto: 'Seus favoritos',
                      onTap: () {},
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 24),
            const Divider(
              thickness: 1,
              indent: 24,
              endIndent: 24,
              color: Color(0xFFE3CFCF),
            ),
            const SizedBox(height: 24),
            Center(
              child: SizedBox(
                width: 200,
                child: ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.pets, color: Colors.white, size: 20),
                  label: const Text(
                    'LADVET',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      letterSpacing: 1,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: corBotao,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24),
                    ),
                    elevation: 2,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Clique aqui para saber a historia da nosso aplicativo!',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 11, color: corLinkRodape),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildCabecalho(BuildContext context) {
    return Container(
      width: double.infinity,
      color: corCabecalho,
      padding: const EdgeInsets.only(top: 8, bottom: 60),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  icon: const Icon(Icons.undo, color: Colors.white),
                  onPressed: () {},
                ),
                TextButton(
                  onPressed: () {},
                  child: Text(
                    'Voltar pro início',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Transform.translate(
            offset: const Offset(0, 60),
            child: Container(
              width: 110,
              height: 110,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFEDEDED),
                border: Border.all(color: Colors.white, width: 3),
              ),
              child: const Icon(Icons.person, size: 70, color: corCabecalho),
            ),
          ),
        ],
      ),
    );
  }
}

class _BotaoMenu extends StatelessWidget {
  final IconData icone;
  final String texto;
  final VoidCallback onTap;

  const _BotaoMenu({
    required this.icone,
    required this.texto,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: PerfilPage.corBotao,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: onTap,
        child: Container(
          height: 60,
          padding: EdgeInsets.symmetric(horizontal: 10),
          child: Row(
            children: [
              Icon(icone, color: Colors.white, size: 20),
              Container(
                margin: EdgeInsets.symmetric(horizontal: 8),
                width: 1,
                height: 30,
                color: Colors.white54,
              ),
              Expanded(
                child: Text(
                  texto,
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
