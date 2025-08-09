module.exports = {
  name: {
    type: String,
    required: true,
    trim: true,
    public: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    public: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'developer'],
    default: 'user',
    public: true
  },
  given_name: {
    type: String,
    required: false,
    default: '',
    public: true
  },
  family_name: {
    type: String,
    required: false,
    default: '',
    public: true
  },
  googleId: {
    type: String,
    required: false,
    default: '',
    public: false
  },
  picture: {
    type: String,
    required: false,
    default: '',
    public: true
  },
  stripe: {
    type: Object,
    required: false,
    default: {},
    public: false
  }
}
