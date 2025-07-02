class Post {
  final int id;
  final int userId;
  final String content;
  final String? imageUrl;
  final String createdAt;
  final String username; // Adicionado para exibir o nome do usuário

  Post({
    required this.id,
    required this.userId,
    required this.content,
    this.imageUrl,
    required this.createdAt,
    required this.username,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'],
      userId: json['user_id'],
      content: json['content'],
      imageUrl: json['image_url'],
      createdAt: json['created_at'],
      username: json['username'], // Assumindo que a API retorna o username junto com o post
    );
  }
}
