
import 'package:flutter/material.dart';
import 'package:flutter_ladvet/ui/configuracao.dart';

const Color rosaCabecalho = Color(0xFFC98A8A);
const Color rosaFundo = Color(0xFFF2E5E7);
const Color azulTexto = Color(0xFF5746B8);

class NossaHistoriaPage extends StatelessWidget {
  const NossaHistoriaPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: rosaFundo,

      appBar: AppBar(
        backgroundColor: rosaCabecalho,
        elevation: 0,
        toolbarHeight: 65,
        leading: IconButton(
          icon: const Icon(
            Icons.reply_rounded,
            color: Colors.white,
            size: 25,
          ),
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

      body: SafeArea(
        child: Stack(
          children: [
            // FUNDO ROSA CLARO
            Container(
              color: rosaFundo,
            ),

            // BOLINHA ROSA SUPERIOR ESQUERDA
            Positioned(
              top: -75,
              left: -75,
              child: Container(
                width: 210,
                height: 210,
                decoration: const BoxDecoration(
                  color: Color(0xFFE8B4AD),
                  shape: BoxShape.circle,
                ),
              ),
            ),

            // BOLINHA AZUL SUPERIOR DIREITA
            Positioned(
              top: 100,
              right: -95,
              child: Container(
                width: 220,
                height: 220,
                decoration: const BoxDecoration(
                  color: Color(0xFFDDD7E9),
                  shape: BoxShape.circle,
                ),
              ),
            ),

            // BOLINHA ROSA INFERIOR ESQUERDA
            Positioned(
              bottom: -100,
              left: -80,
              child: Container(
                width: 230,
                height: 230,
                decoration: const BoxDecoration(
                  color: Color(0xFFEFD5D7),
                  shape: BoxShape.circle,
                ),
              ),
            ),

            // BOLINHA AZUL INFERIOR DIREITA
            Positioned(
              bottom: 60,
              right: -100,
              child: Container(
                width: 220,
                height: 220,
                decoration: const BoxDecoration(
                  color: Color(0xFFDDD7E9),
                  shape: BoxShape.circle,
                ),
              ),
            ),

            // CONTEÚDO DA PÁGINA
            SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 22,
                  vertical: 35,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [

                    // LOGO LADVET
                    Image.asset(
                      'assets/logo.png',
                      width: 250,
                      height: 170,
                      fit: BoxFit.contain,
                    ),

                    const SizedBox(height: 35),

                    // TEXTO SOBRE A HISTÓRIA
                    const Text(
                      'Criamos o LadVet devido ao nosso grande amor '
                      'pelos animais e à empatia que sentimos pelos '
                      'cachorros em situação de rua. Seu objetivo é '
                      'facilitar a adoção responsável, conectando animais '
                      'que precisam de um lar a pessoas interessadas em '
                      'adotar. O nome LadVet possui um significado especial '
                      'e representa os principais valores do projeto. '
                      'A letra “L” refere-se à palavra Love (amor), '
                      'simbolizando o carinho e o respeito pelos animais. '
                      'As letras “AD” representam Adoção, que é o foco '
                      'principal do aplicativo. Já “VET” faz referência '
                      'à Veterinária, destacando a importância dos cuidados '
                      'com a saúde e a qualidade de vida dos animais. '
                      'Dessa forma, o LadVet foi criado com o propósito '
                      'de unir amor, adoção e cuidados veterinários em '
                      'uma única plataforma, contribuindo para que mais '
                      'animais encontrem famílias responsáveis e recebam '
                      'a atenção que merecem.',

                      textAlign: TextAlign.center,

                      style: TextStyle(
                        fontSize: 16,
                        height: 1.6,
                        color: azulTexto,
                        fontWeight: FontWeight.w400,
                      ),
                    ),

                    const SizedBox(height: 25),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
