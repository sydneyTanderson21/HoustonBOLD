├── src/
│   ├── api/
│   │   ├── eventbrite.js           # Eventbrite API integration logic
│   │   ├── google.js               # Google API integration logic
│   │   └── index.js                # API endpoints
│   ├── routes/
│   │   └── apiRouter.js
│   ├── config/
│   │   ├── index.js                # Environment configuration
│   │   ├── kafka.js                # Kafka configuration
│   │   └── redis.js                # Redis configuration
│   ├── controllers/
│   │   └── event.js                # Controller for handling event data
│   ├── models/
│   │   └── event.js                # Event data model
│   ├── services/
│   │   └── event.js                # Service for fetching and processing event data
│   ├── utils/
│   │   └── kafka.js                # Kafka utility functions
│   ├── kafka.js                    # Kafka event stream processing logic
│   └── server.js                   # Express.js server initialization and entry point
├── test/
│   ├── controllers/                # Tests for controllers
│   ├── models/                     # Tests for models
│   └── services/                   # Tests for services
├── package.json
└── README.md
