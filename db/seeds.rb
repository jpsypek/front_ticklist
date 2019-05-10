Climb.destroy_all
User.destroy_all

# users
jack = User.create(name: "Jack Sypek")
ben = User.create(name: "Ben Reilly")

# jack climbs
Climb.create(user: jack, name: "Off the Couch", user_rating: "5.10a", guide_rating: "5.10b", stars: 1, comments: "Great warm-up for the area", climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/108609759/off-the-couch")

Climb.create(user: jack, name: "Handicapable", guide_rating: "5.12b", pitches: 1, climb_type: "Sport", sent: false, mp_link: "https://www.mountainproject.com/route/108609767/handicapable")

Climb.create(user: jack, name: "Edges and Ledges", user_rating: "5.8", guide_rating: "5.8", stars: 4, comments: "Super fun!", climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/105870616/edges-and-ledges")

Climb.create(user: jack, name: "Bastille Crack", guide_rating: "5.7", climb_type: "Trad", pitches: 5, sent: false, mp_link: "https://www.mountainproject.com/area/105744246/eldorado-canyon-sp")

Climb.create(user: jack, name: "Lucid Dreaming", guide_rating: "5.12c", climb_type: "Sport", pitches: 1, sent: false, mp_link: "https://www.mountainproject.com/route/105755821/lucid-dreaming")

Climb.create(user: jack, name: "Durrance", user_rating: "5.8", guide_rating: "5.7", stars: 4, climb_type: "Trad", pitches: 5, sent: true, mp_link: "https://www.mountainproject.com/route/105714812/durrance", comments:"mediocre climbing up an incredible feature")

Climb.create(user: jack, name: "Hippopotamus", user_rating: "5.10d", guide_rating: "5.10d", stars: 2, climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/107204916/hippopotamus", comments:"short and thuggy")

Climb.create(user: jack, name: "Bob Marley Meets Master Gan", user_rating: "5.11b", guide_rating: "5.11b", stars: 2, climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/106096055/bob-marley-meets-master-ganj", comments:"fun route on decent stone")

Climb.create(user: jack, name: "Undertow", guide_rating: "5.12b", stars: 3, climb_type: "Sport", pitches: 1, sent: false, mp_link: "https://www.mountainproject.com/route/105752323/undertow", comments:"pumpy with two distinct cruxes")

# ben climbs
Climb.create(user: ben, name: "Off the Couch", user_rating: "5.10a", guide_rating: "5.10b", stars: 1, comments: "Fun Movement", climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/108609759/off-the-couch")

Climb.create(user: ben, name: "Playin Hooky", guide_rating: "5.8", pitches: 4, climb_type: "Sport", sent: false, mp_link: "https://www.mountainproject.com/route/106701638/playin-hooky")

Climb.create(user: ben, name: "Ace in the Hole", user_rating: "5.9", guide_rating: "5.10a", stars: 3, comments: "Fun, thin climbing", climb_type: "Sport", pitches: 1, sent: true, mp_link: "https://www.mountainproject.com/route/105748280/ace-in-the-hole")

Climb.create(user: ben, name: "Freerider", guide_rating: "5.13a", climb_type: "Trad", pitches: 30, sent: false, mp_link: "https://www.mountainproject.com/route/106261545/freeriderp")
