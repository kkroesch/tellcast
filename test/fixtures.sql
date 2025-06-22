// setup/surreal-init.surql

-- Beispiel-Inhalt für .env:
-- SURREALDB_URL=https://your-db.surrealdb.cloud
-- SURREALDB_NAMESPACE=tellcast
-- SURREALDB_DATABASE=app
-- SURREALDB_USERNAME=myuser
-- SURREALDB_PASSWORD=supersecret

-- Der Zugriff im Code erfolgt via process.env.SURREALDB_*

-- Beispiel-User
CREATE user:trumpf CONTENT {
  handle: "trumpf",
  bio: "Compiler-Visionär und selbsternanntes Genie.",
  website: "https://truth.social"
};

CREATE user:thorwalds CONTENT {
  handle: "thorwalds",
  bio: "Backend-Architekt. Legacy-Romantiker. COBOL ist Liebe.",
  website: "https://opensourcelegacy.org"
};

CREATE user:epsilon CONTENT {
  handle: "epsilon",
  bio: "Mustererkenner. Wenn’s kein Pattern ist, ist’s kein Code.",
  website: "https://epsilon.dev"
};

CREATE user:karsten CONTENT {
  handle: "karsten",
  bio: "DevOps-Philosoph mit Liebe zur Kommandozeile.",
  website: "https://kroesch.net"
};

CREATE user:lisbeth CONTENT {
  handle: "lisbeth",
  bio: "Reverse-Engineer mit Humor. Frontend läuft auf'm Toaster.",
  website: "https://lisbeth.codes"
};

-- Beispiel-Tweets
CREATE tweet:t1 CONTENT {
  text: "Ich bin sehr klug. Vielleicht der klügste. Niemand optimiert Compiler wie ich.",
  timestamp: time::now(),
  user: user:trumpf
};

CREATE tweet:t2 CONTENT {
  text: "Wenn Du denkst, Du brauchst noch ein Pattern – brauchst Du wahrscheinlich gar kein OOP mehr.",
  timestamp: time::now(),
  user: user:epsilon
};

CREATE tweet:t3 CONTENT {
  text: "Ich baue mein Backend jetzt auf COBOL um. Zukunftssicherheit!",
  timestamp: time::now(),
  user: user:thorwalds
};

CREATE tweet:t4 CONTENT {
  text: "Meine App ist jetzt stabil. Sie crasht immer an derselben Stelle.",
  timestamp: time::now(),
  user: user:karsten
};

CREATE tweet:t5 CONTENT {
  text: "RT @epsilon: Wenn Du denkst, Du brauchst noch ein Pattern – brauchst Du wahrscheinlich gar kein OOP mehr.",
  timestamp: time::now(),
  user: user:karsten
};

CREATE tweet:t6 CONTENT {
  text: "@thorwalds ich hab dein COBOL-Repo geforkt. Läuft jetzt auf meiner Waschmaschine.",
  timestamp: time::now(),
  user: user:lisbeth
};

CREATE tweet:t7 CONTENT {
  text: "@karsten hat wieder ein Feature nachgebaut, das niemand wollte. #DevLife",
  timestamp: time::now(),
  user: user:trumpf
};

CREATE tweet:t8 CONTENT {
  text: "#HotTake: YAML ist wie Schriftsprache für Compiler. Unpräzise, aber menschlich.",
  timestamp: time::now(),
  user: user:thorwalds
};

CREATE tweet:t9 CONTENT {
  text: "Ich deploye jetzt mit einer Excel-Makro-Pipeline. Endlich DevOps ohne YAML.",
  timestamp: time::now(),
  user: user:lisbeth
};

CREATE tweet:t10 CONTENT {
  text: "RT @karsten: Meine App ist jetzt stabil. Sie crasht immer an derselben Stelle.",
  timestamp: time::now(),
  user: user:epsilon
};

CREATE tweet:t11 CONTENT {
  text: "Warum heißt es eigentlich ‚Production‘, wenn nichts produziert wird außer Bugs?",
  timestamp: time::now(),
  user: user:karsten
};

CREATE tweet:t12 CONTENT {
  text: "Der Unterschied zwischen Java und JavaScript ist wie zwischen Auto und Automat.",
  timestamp: time::now(),
  user: user:thorwalds
};

CREATE tweet:t13 CONTENT {
  text: "Hab ich auf Stackoverflow gefunden.",
  timestamp: time::now(),
  user: user:karsten
};

CREATE tweet:t14 CONTENT {
  text: "Antwort: Aus der Frage oder der Antwort?",
  timestamp: time::now(),
  user: user:lisbeth,
  reply_to: tweet:t13
};

-- Beziehungen
RELATE user:karsten->follows->user:epsilon;
RELATE user:karsten->follows->user:thorwalds;
RELATE user:thorwalds->follows->user:trumpf;
RELATE user:lisbeth->follows->user:thorwalds;
RELATE user:lisbeth->follows->user:karsten;
RELATE user:trumpf->follows->user:karsten;

-- Likes
RELATE user:karsten->likes->tweet:t2;
RELATE user:epsilon->likes->tweet:t4;
RELATE user:lisbeth->likes->tweet:t3;
RELATE user:thorwalds->likes->tweet:t6;
RELATE user:lisbeth->likes->tweet:t12;
RELATE user:karsten->likes->tweet:t11;
