<h1> Web service for sorting pictures by color temperature </h1>
<p> A simple service that turns up to 50 images into a collage sorted by color temperature. </p>

<img width="100%" src="https://github.com/user-attachments/assets/3d8661a4-1e54-4af8-b07b-e7d1a2d8b5ad" alt="Preview" /> 
<img width="100%" alt="Preview" src="https://github.com/user-attachments/assets/a70819a5-b224-4521-9ac4-a79990574583" />

## ⚙️ Tech Stack
- **Frontend**: Angular
- **Backend**: NestJS
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 🚀 Getting Started

### ✅ Common installation

> Before launching, make sure that the following are installed: Node.js, npm, Angular CLI

#### 1. Clone repo

```bash
git clone https://github.com/variaxxx/picture-temperature-sorting.git
cd picture-temperature-sorting
```

#### 2. Install dependencies

```bash
cd frontend/
npm i
cd ../backend
npm i
```

#### 3. Run the project

##### Development:

Frontend:
```bash
npm run start
```
now app is available on `http://localhost:4200` by default.

Backend:
```bash
npm run start:dev
```
app will be available on `http://localhost:3000`.

##### Production

Frontend:
```bash
npm run build
```
now you need to serve the received static files by some web server (Apache, nginx etc).

Backend:
```bash
npm run build
npm run start:prod
```

---

### 📦 Docker installation

#### 1. Clone repo

```bash
git clone https://github.com/variaxxx/picture-temperature-sorting.git
cd picture-temperature-sorting
```

#### 2. Run the containers

```bash
docker compose up --build -d
```

Application will be available on `http://localhost:80/`. If you want to change the port, then change it in docker compose for nginx service. You can configure nginx using the nginx.conf file. 

#### 3. Stop the containers

```bash
docker compose down
```

---

> This project was created solely for educational and demonstration purposes.  
> The author is not responsible for any damage, loss of data or other consequences resulting from the use of this project.  
> Use it at your own risk.