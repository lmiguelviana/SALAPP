import 'package:flutter/material.dart';
import 'package:salaapp/screens/home_screen.dart';
import 'package:salaapp/screens/gts_list_screen.dart';
import 'package:salaapp/screens/profile_screen.dart';
import 'package:salaapp/screens/social_screen.dart';
import 'package:salaapp/screens/encontros_list_screen.dart';

class MainAppScreen extends StatefulWidget {
  const MainAppScreen({super.key});

  @override
  State<MainAppScreen> createState() => _MainAppScreenState();
}

class _MainAppScreenState extends State<MainAppScreen> {
  int _selectedIndex = 0;

  // Lista de telas
  final List<Widget> _screens = [
    const HomeScreen(), // Tela Home real
    const SocialScreen(), // Tela Social real
    const GtsListScreen(), // Tela GTs real
    const EncontrosListScreen(), // Tela Encontros real
    const ProfileScreen(), // Tela Perfil real
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black, // Fundo preto
        selectedItemColor: Colors.amber, // Ícone selecionado dourado
        unselectedItemColor: Colors.white70, // Ícones não selecionados brancos
        type: BottomNavigationBarType.fixed, // Garante que todos os itens sejam visíveis
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people),
            label: 'Social',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.group_work),
            label: 'GTs',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.event),
            label: 'Encontros',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}
