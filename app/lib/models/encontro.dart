class Encontro {
  final int id;
  final String title;
  final String description;
  final String eventDate;
  final String location;
  final String additionalInfo;

  Encontro({
    required this.id,
    required this.title,
    required this.description,
    required this.eventDate,
    required this.location,
    required this.additionalInfo,
  });

  factory Encontro.fromJson(Map<String, dynamic> json) {
    return Encontro(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      eventDate: json['event_date'],
      location: json['location'],
      additionalInfo: json['additional_info'],
    );
  }
}
