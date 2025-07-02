import 'package:flutter/material.dart';
import 'package:salaapp/models/post.dart';
import 'package:salaapp/services/api_service.dart';

class SocialScreen extends StatefulWidget {
  const SocialScreen({super.key});

  @override
  State<SocialScreen> createState() => _SocialScreenState();
}

class _SocialScreenState extends State<SocialScreen> {
  final ApiService _apiService = ApiService();
  List<Post> _posts = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchPosts();
  }

  Future<void> _fetchPosts() async {
    try {
      final posts = await _apiService.fetchPosts();
      setState(() {
        _posts = posts;
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
        title: const Text('Social', style: TextStyle(color: Colors.amber)),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.message, color: Colors.amber), // Ícone de Mensagens Diretas (placeholder)
            onPressed: () {
              // Lógica para mensagens
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: Colors.amber))
          : _error != null
              ? Center(child: Text('Erro: $_error', style: const TextStyle(color: Colors.red)))
              : _posts.isEmpty
                  ? const Center(child: Text('Nenhum Post disponível.', style: TextStyle(color: Colors.white70)))
                  : ListView.builder(
                      padding: const EdgeInsets.all(16.0),
                      itemCount: _posts.length,
                      itemBuilder: (context, index) {
                        final post = _posts[index];
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
                                // Cabeçalho do Post
                                Row(
                                  children: [
                                    CircleAvatar(
                                      backgroundImage: NetworkImage('https://via.placeholder.com/50/000000/FFFFFF?text=U'), // Foto de Perfil do Usuário (placeholder)
                                      radius: 20,
                                    ),
                                    const SizedBox(width: 8.0),
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          post.username, // Nome do usuário do post
                                          style: Theme.of(context).textTheme.titleSmall?.copyWith(color: Colors.white, fontWeight: FontWeight.bold),
                                        ),
                                        Text(
                                          post.createdAt, // Data de criação do post
                                          style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white54),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 16.0),

                                // Imagem do Post (se houver)
                                if (post.imageUrl != null && post.imageUrl!.isNotEmpty)
                                  Column(
                                    children: [
                                      Container(
                                        height: 200,
                                        decoration: BoxDecoration(
                                          borderRadius: BorderRadius.circular(8.0),
                                          image: DecorationImage(
                                            image: NetworkImage(post.imageUrl!), // Imagem real do post
                                            fit: BoxFit.cover,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(height: 16.0),
                                    ],
                                  ),

                                // Texto do Post
                                Text(
                                  post.content,
                                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white),
                                ),
                                const SizedBox(height: 16.0),

                                // Rodapé do Post (Interações - placeholders)
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        IconButton(
                                          icon: const Icon(Icons.favorite_border, color: Colors.amber),
                                          onPressed: () {},
                                        ),
                                        Text(
                                          '0 Curtidas', // Placeholder
                                          style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70),
                                        ),
                                        const SizedBox(width: 16.0),
                                        IconButton(
                                          icon: const Icon(Icons.comment, color: Colors.amber),
                                          onPressed: () {},
                                        ),
                                        Text(
                                          '0 Comentários', // Placeholder
                                          style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70),
                                        ),
                                      ],
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.share, color: Colors.amber),
                                      onPressed: () {},
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Lógica para criar novo post
          print('Botão para criar novo post pressionado!');
        },
        backgroundColor: Colors.amber,
        child: const Icon(Icons.add, color: Colors.black),
      ),
    );
  }
}