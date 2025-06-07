

```markdown
# 🛰️ Disaster Relief Route Planner

A full-stack web application that allows users to add villages and relief centers on a map and generate the shortest relief delivery route between them — helping optimize disaster response.

## 📌 Project Overview

The goal is to simulate relief route planning during a disaster using village and relief center coordinates. Users can:
- Add villages and relief centers dynamically.
- Visualize them as map markers.
- Generate optimized delivery routes (shortest path) between them.

---

## 🧠 Tech Stack

### Frontend
- **React** (with Vite)
- **TypeScript**
- **React-Leaflet** (Leaflet.js wrapper for React)
- **Axios** for API calls

### Backend
- **Python**
- **Flask**
- **NetworkX** for graph-based shortest path logic
- **Flask-CORS** for cross-origin frontend-backend communication
- **JSON** files for mock data storage

---

## 🔧 Project Structure

```

project-root/
│
├── backend/
│   ├── app.py                     # Flask backend API
│   ├── data/
│   │   ├── villages.json          # Villages data (mock or added by user)
│   │   └── relief\_centers.json   # Relief centers data
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── MapPanel.tsx       # Map rendering with React-Leaflet
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── vite.config.ts
│
└── README.md

````

---

## 🚀 How to Run the App

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/relief-route-planner.git
cd relief-route-planner
````

### 2. Run the Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> Make sure `villages.json` and `relief_centers.json` are present in the `data/` folder.

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

---

## ⚙️ API Endpoints

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/villages`          | Fetch all villages               |
| GET    | `/relief_centers`    | Fetch all relief centers         |
| POST   | `/add_village`       | Add a new village                |
| POST   | `/add_relief_center` | Add a new relief center          |
| POST   | `/generate_plan`     | Compute shortest delivery routes |

---

## 🗺️ Features

* ✅ Add new village or center with `name`, `lat`, `lon`, and `needs`
* ✅ Map-based pin visualization using Leaflet
* ✅ Real-time shortest path calculation using NetworkX
* ✅ Visual polyline route between closest center and village

---

## 🛠️ Improvements Planned

* ⚙️ Add Dijkstra/other weighted algorithms for larger maps
* 📦 Store data in database (SQLite/PostgreSQL)
* 🔒 Add user authentication
* 📍 Support multi-stop routing for bulk deliveries

---

## 🤝 Contributing

Pull requests are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Authors

* Suprakash Biswas


---


```

```
