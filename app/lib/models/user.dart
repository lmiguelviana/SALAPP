class User {
  final int id;
  final String username;
  final String email;
  final String? fullName;
  final String? profilePictureUrl;
  final String createdAt;

  User({
    required this.id,
    required this.username,
    required this.email,
    this.fullName,
    this.profilePictureUrl,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      fullName: json['fullName'],
      profilePictureUrl: json['profilePictureUrl'],
      createdAt: json['createdAt'],
    );
  }
}
