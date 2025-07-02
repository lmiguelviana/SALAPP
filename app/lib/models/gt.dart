class Gt {
  final int id;
  final String title;
  final String description;
  final String zoomLink;
  final String presenterName;
  final String gtDate;
  final String gtTime;
  final String category;

  Gt({
    required this.id,
    required this.title,
    required this.description,
    required this.zoomLink,
    required this.presenterName,
    required this.gtDate,
    required this.gtTime,
    required this.category,
  });

  factory Gt.fromJson(Map<String, dynamic> json) {
    return Gt(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      zoomLink: json['zoom_link'],
      presenterName: json['presenter_name'],
      gtDate: json['gt_date'],
      gtTime: json['gt_time'],
      category: json['category'],
    );
  }
}
