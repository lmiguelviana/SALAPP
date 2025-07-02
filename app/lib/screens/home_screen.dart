import 'package:flutter/material.dart';
import 'package:salaapp/models/encontro.dart';
import 'package:salaapp/models/gt.dart';
import 'package:salaapp/services/api_service.dart';
import 'package:salaapp/screens/gt_details_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _apiService = ApiService();
  List<Gt> _gts = [];
  List<Encontro> _encontros = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      final gts = await _apiService.fetchGts();
      final encontros = await _apiService.fetchEncontros();
      setState(() {
        _gts = gts;
        _encontros = encontros;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Image.asset(
          'assets/logo.png', // Logo da Sala do Mestres
          height: 40,
        ),
        centerTitle: false, // Alinha o logo à esquerda
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications, color: Colors.amber), // Ícone de Notificações
            onPressed: () {
              // Lógica para notificações
            },
          ),
          IconButton(
            icon: const Icon(Icons.person, color: Colors.amber), // Ícone de Perfil (temporário, será substituído pela navegação da barra inferior)
            onPressed: () {
              // Lógica para perfil
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: Colors.amber))
          : _error != null
              ? Center(child: Text('Erro: $_error', style: const TextStyle(color: Colors.red)))
              : SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        // Seção de Banners de Destaque (GTs)
                        Text(
                          'GTs em Destaque',
                          style: Theme.of(context).textTheme.headlineSmall?.copyWith(color: Colors.amber, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 16.0),
                        SizedBox(
                          height: 200, // Altura para os banners
                          child: _gts.isEmpty
                              ? const Center(child: Text('Nenhum GT disponível.', style: TextStyle(color: Colors.white70)))
                              : ListView.builder(
                                  scrollDirection: Axis.horizontal,
                                  itemCount: _gts.length,
                                  itemBuilder: (context, index) {
                                    final gt = _gts[index];
                                    return Container(
                                      width: 300,
                                      margin: const EdgeInsets.only(right: 16.0),
                                      decoration: BoxDecoration(
                                        color: Colors.grey[850],
                                        borderRadius: BorderRadius.circular(12.0),
                                        image: const DecorationImage(
                                          image: NetworkImage('https://via.placeholder.com/300x200/000000/FFFFFF?text=GT+Banner'), // Imagem placeholder
                                          fit: BoxFit.cover,
                                        ),
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(16.0),
                                        child: Column(
                                          mainAxisAlignment: MainAxisAlignment.end,
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              gt.title,
                                              style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white, fontWeight: FontWeight.bold),
                                            ),
                                            Text(
                                              'Apresentador: ${gt.presenterName}',
                                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                                            ),
                                            Text(
                                              'Dia: ${gt.gtDate} - Horário: ${gt.gtTime}',
                                              style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70),
                                            ),
                                            const SizedBox(height: 8.0),
                                            ElevatedButton.icon(
                                              onPressed: () {
                                                Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                    builder: (context) => GtDetailsScreen(gt: gt),
                                                  ),
                                                );
                                              },
                                              icon: const Icon(Icons.videocam, color: Colors.black), // Ícone preto
                                              label: const Text('Participar via Zoom', style: TextStyle(color: Colors.black)), // Texto preto
                                              style: ElevatedButton.styleFrom(
                                                backgroundColor: Colors.amber, // Botão dourado
                                                shape: RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.circular(8.0),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                ),
                        ),
                        const SizedBox(height: 32.0),

                        // Seção de Encontros da Sala
                        Text(
                          'Próximos Encontros da Sala',
                          style: Theme.of(context).textTheme.headlineSmall?.copyWith(color: Colors.amber, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 16.0),
                        _encontros.isEmpty
                            ? const Center(child: Text('Nenhum Encontro disponível.', style: TextStyle(color: Colors.white70)))
                            : ListView.builder(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(), // Desabilita o scroll interno
                                itemCount: _encontros.length,
                                itemBuilder: (context, index) {
                                  final encontro = _encontros[index];
                                  return Card(
                                    color: Colors.grey[900], // Fundo do card escuro
                                    margin: const EdgeInsets.only(bottom: 16.0),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.all(16.0),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            encontro.title,
                                            style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.amber, fontWeight: FontWeight.bold),
                                          ),
                                          const SizedBox(height: 8.0),
                                          Text(
                                            'Data: ${encontro.eventDate}',
                                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                                          ),
                                          Text(
                                            'Local: ${encontro.location}',
                                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                                          ),
                                          const SizedBox(height: 16.0),
                                          Align(
                                            alignment: Alignment.centerRight,
                                            child: ElevatedButton(
                                              onPressed: () {
                                                // Lógica para ver detalhes do encontro
                                              },
                                              style: ElevatedButton.styleFrom(
                                                backgroundColor: Colors.amber, // Botão dourado
                                              ),
                                              child: const Text('Ver Detalhes', style: TextStyle(color: Colors.black)), // Texto preto
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  );
                                },
                              ),
                      ],
                    ),
                  ),
                ),
    );
  }
}