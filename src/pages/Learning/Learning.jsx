import "./Learning.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Learning() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopics() {
      const querySnapshot = await getDocs(collection(db, "topics"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(data);
    }
    fetchTopics();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="title-section">
          <h2>Học Từ Vựng Theo Chủ Đề</h2>
        </div>
        <div className="topics-grid">
          {topics.map(topic => (
            <div
              key={topic.id}
              className="topic-card"
              style={{
                background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('${topic.image}') center/cover`
              }}
              onClick={() => navigate(`/topic/${topic.slug}`)}
            >
              <div className="topic-content">
                <h3>{topic.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}