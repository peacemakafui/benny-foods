# BennyFoods - Fresh Farm Eggs 🥚

A professional wholesale ordering website for fresh farm eggs from Wireku Asubonteng Farms in Ghana.

## Features

- 📦 **Wholesale Orders**: Bulk ordering system with minimum order requirements
- 💰 **Dynamic Pricing**: Real-time price calculation based on quantities
- 📱 **WhatsApp Integration**: Direct order submission via WhatsApp
- 🛡️ **Spam Protection**: Google reCAPTCHA v3 prevents automated spam
- ✅ **Order Validation**: Prevents empty orders with visual feedback
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 📊 **Order Summary**: Live order summary with total calculations
- 🖼️ **Product Images**: High-quality product images with fallback icons

## Products Available

1. **6 Pcs Pack** - GH₵ 15.00 (Min: 10 units)
2. **12 Pcs Pack** - GH₵ 27.00 (Min: 10 units)
3. **20 Pcs Pack** - GH₵ 45.00 (Min: 10 units)
4. **30 Pcs Tray** - GH₵ 18.00 (Min: 50 units)
5. **30 Pcs Large Tray** - GH₵ 30.00 (Min: 50 units)

## Project Structure

```
bennyfoods/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # Stylesheet
│   ├── js/
│   │   └── app.js         # JavaScript functionality
│   └── images/            # Local images (optional)
├── README.md              # Documentation
└── .gitignore            # Git ignore rules
```

## Setup Instructions

### 1. Configure WhatsApp Number

Open `assets/js/app.js` and update the WhatsApp number:

```javascript
// Line 9 in app.js
const WHATSAPP_NUMBER = '233502095912'; // Replace with your number
```

**Important**: Use your WhatsApp number in international format without `+` or spaces.
- Example for Ghana: `233241234567`
- Example for Nigeria: `234XXXXXXXXXX`

### 2. Setup Google reCAPTCHA v3 (Anti-Spam Protection)

**Important**: The test key included works for localhost only. For production, you MUST get your own keys.

1. Visit [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Click "Create" or "+" to register a new site
3. Fill in the form:
   - **Label**: BennyFoods (or your site name)
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domain (e.g., `bennyfoods.com`, `yourusername.github.io`)
   - For testing, also add: `localhost`
4. Accept terms and submit
5. Copy your **Site Key** and **Secret Key**

6. Update `assets/js/app.js` with your Site Key:

```javascript
// Line 13 in app.js
const RECAPTCHA_SITE_KEY = 'YOUR_SITE_KEY_HERE';
```

7. Update `index.html` with your Site Key (line 19):

```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY_HERE"></script>
```

**Note**: reCAPTCHA v3 runs in the background and doesn't require user interaction (no checkbox). It scores each request and blocks suspicious activity.

### 3. Local Testing

Simply open `index.html` in your web browser:

```bash
# Using macOS
open index.html

# Or use a local server (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### 3. Hosting Options

#### Option A: GitHub Pages (Free)
1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/bennyfoods`

#### Option B: Netlify (Free)
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the `bennyfoods` folder
3. Your site will be live instantly with a custom URL

#### Option C: Vercel (Free)
1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload files
3. Deploy with one click

#### Option D: Traditional Hosting (cPanel/FTP)
1. Zip your project files
2. Upload to your hosting via FTP or cPanel File Manager
3. Extract in your public_html or www directory

## Customization

### Update Prices
Edit the prices in `assets/js/app.js`:

```javascript
const prices = { 
    six: 15,      // Change prices here
    twelve: 27, 
    twenty: 45, 
    medium: 18, 
    large: 30 
};
```

### Update Minimum Orders
Edit minimum quantities in `assets/js/app.js`:

```javascript
const minOrders = { 
    six: 10,      // Change minimum orders here
    twelve: 10, 
    twenty: 10, 
    medium: 50, 
    large: 50 
};
```

### Update Contact Information
Edit the footer section in `index.html` (lines 181-210) to update:
- Farm location
- Manager name and phone
- YouTube channel link

### Change Colors
Edit the color scheme in `assets/css/style.css`:
- Primary color: `#8B7355`
- Secondary color: `#7A9D54`
- Background: `#F5F5DC` and `#E8DCC4`

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- WhatsApp Business API
- Unsplash API (for product images)

## Contact

**BennyFoods**
- Location: Asante Bekwai, Ghana
- Farm Manager: Emmanuel Nyame
- Sales Manager: Benjamin Akwetey
- Phone: 050 209 5912
- Farm: Wireku Asubonteng Farms
- YouTube: [@wireakuasubontengfarms](https://youtube.com/@wireakuasubontengfarms)

## License

© 2024 BennyFoods - All Rights Reserved

---

**Need help?** Contact the farm manager at 050 209 5912 or visit our YouTube channel for more information about our farm operations.
