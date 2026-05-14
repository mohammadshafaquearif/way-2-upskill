# 🚀 Deployment Guide - Zyvotrix

## 📋 **Deployment Options**

### 1. **Vercel (Recommended) ✅**

#### **Step 1: Prepare Your Code**
```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### **Step 2: Setup Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository

#### **Step 3: Configure Environment Variables**
In Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=your_supabase_database_url
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

#### **Step 4: Database Setup (Supabase)**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy Database URL
4. Run your SQL schema in Supabase SQL Editor

---

### 2. **Netlify (Frontend Only)**

#### **For Frontend:**
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`

#### **For Backend:**
- Use Railway, Render, or Heroku for Express.js API

---

### 3. **Railway (Full Stack)**

#### **Complete Setup:**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Add PostgreSQL database
4. Deploy with one click

---

## 🗄️ **Database Migration Options**

### **Option 1: Supabase (Recommended)**
```bash
# 1. Create Supabase project
# 2. Copy connection string
# 3. Update environment variables
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

### **Option 2: Vercel Postgres**
```bash
# 1. Add Vercel Postgres addon
# 2. Use provided connection string
DATABASE_URL=postgres://username:password@ep-xxx.us-east-1.postgres.vercel-storage.com/verceldb
```

### **Option 3: PlanetScale**
```bash
# 1. Create PlanetScale database
# 2. Copy connection string
DATABASE_URL=mysql://username:password@host/database
```

---

## 🔧 **Environment Variables Setup**

### **Development (.env.local)**
```
DATABASE_URL=postgresql://localhost:5432/Zyvotrix_db
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### **Production (Vercel)**
```
DATABASE_URL=your_production_database_url
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

---

## 📝 **Step-by-Step Vercel Deployment**

### **1. Prepare Repository**
```bash
# Ensure all files are committed
git status
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### **2. Vercel Setup**
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub
4. Select your repository

### **3. Configure Build Settings**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### **4. Add Environment Variables**
In Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=postgresql://...
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### **5. Database Setup**
1. Create Supabase project
2. Copy database URL
3. Run SQL schema in Supabase
4. Update DATABASE_URL in Vercel

### **6. Deploy**
Click "Deploy" and wait for deployment to complete!

---

## 🎯 **Recommended Stack**

```
Frontend: Vercel (React + Vite)
Backend: Vercel Serverless Functions
Database: Supabase PostgreSQL
Domain: Custom domain (optional)
```

---

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Build Failures**
   - Check package.json scripts
   - Ensure all dependencies are listed

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check firewall settings
   - Ensure database is accessible

3. **Environment Variables**
   - Double-check variable names
   - Ensure no typos
   - Restart deployment after changes

---

## 📞 **Support**

If you face any issues during deployment:
1. Check Vercel build logs
2. Verify environment variables
3. Test database connection
4. Check browser console for errors

---

## 🎉 **Success!**

Once deployed, your application will be available at:
`https://your-app-name.vercel.app`

**Next Steps:**
- Set up custom domain
- Configure analytics
- Set up monitoring
- Enable HTTPS (automatic with Vercel)
