Climb.destroy_all
User.destroy_all

# users
jack = User.create(name: "Jack Sypek")
ben = User.create(name: "Ben Reilly")

# jack climbs
Climb.create(user: jack, name: "Off the Couch", user_rating: "5.10a", guide_rating: "5.10b", stars: 1, comments: "Great warm-up", climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/108609759/off-the-couch")

Climb.create(user: jack, name: "Handicapable", guide_rating: "5.12b", pitches: 1, climb_type: "Sport", sent: false, mp_link: "https://www.mountainproject.com/route/108609767/handicapableh")

Climb.create(user: jack, name: "Edges and Ledges", user_rating: "5.8", guide_rating: "5.8", stars: 4, comments: "Great warm-up", climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/105870616/edges-and-ledges")

Climb.create(user: jack, name: "Fake climb", user_rating: "5.8", guide_rating: "5.8", stars: 3, comments: "Great warm-up", climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/105870616/edges-and-ledges")

Climb.create(user: jack, name: "Bastille Crack", guide_rating: "5.7", climb_type: "Trad", pitches: 5, sent: false, mp_link: "https://www.mountainproject.com/area/105744246/eldorado-canyon-sp")
