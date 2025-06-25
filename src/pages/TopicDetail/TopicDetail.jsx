import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import "./TopicDetail.css";

export default function TopicDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    async function fetchWords() {
      const topicsSnapshot = await getDocs(
        query(collection(db, "topics"), where("slug", "==", slug))
      );
      if (!topicsSnapshot.empty) {
        const topicDoc = topicsSnapshot.docs[0];
        setTopicName(topicDoc.data().name);
        // Lấy các từ vựng từ subcollection "words" trong topic
        const wordsSnapshot = await getDocs(
          collection(db, "topics", topicDoc.id, "word")
        );
        setWords(wordsSnapshot.docs.map((doc) => doc.data()));
      }
    }
    fetchWords();
  }, [slug]);

  // Xử lý lật flashcard
  const handleFlip = (idx) => {
    setFlipped((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="container" style={{ background: "rgba(255,255,255,0.95)", borderRadius: 20, padding: 30, marginTop: 80 }}>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Quay lại chủ đề
      </button>
      <h2 style={{ textAlign: "center", color: "#4a5568", margin: "20px 0 30px" }}>{topicName}</h2>
      <div className="flashcard-grid">
        {words.map((word, idx) => (
          <div
            className={`flashcard${flipped[idx] ? " flipped" : ""}`}
            key={idx}
            onClick={() => handleFlip(idx)}
            style={{ cursor: "pointer" }}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="word">{word.word}</div>
                <div className="pronunciation">{word.pronunciation}</div>
              </div>
              <div className="flashcard-back">
                <div className="translation">{word.translation}</div>
                <div className="example">{word.example}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}