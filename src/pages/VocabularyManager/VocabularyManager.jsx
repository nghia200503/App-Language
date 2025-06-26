import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./VocabularyManager.css";

export default function VocabularyManager() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [words, setWords] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ word: "", pronunciation: "", translation: "", example: "" });

  // Chủ đề
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [topicForm, setTopicForm] = useState({ name: "", image: "", slug: "" });
  const [editTopicIdx, setEditTopicIdx] = useState(null);

  // Sắp xếp
  const [topicSort, setTopicSort] = useState("order"); // "order" | "alpha"
  const [wordSort, setWordSort] = useState("order");   // "order" | "alpha"

  // Load topics
  useEffect(() => {
    async function fetchTopics() {
      const snap = await getDocs(collection(db, "topics"));
      setTopics(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchTopics();
  }, []);

  // Kiểm tra quyền truy cập
//   useEffect(() => {
//   const role = localStorage.getItem("role");
//   if (role !== "admin") {
//     navigate("/learning");
//   }
// }, [navigate, location]);

  // Load words when topic selected
  useEffect(() => {
    async function fetchWords() {
      if (!selectedTopic) return setWords([]);
      const snap = await getDocs(collection(db, "topics", selectedTopic.id, "word"));
      setWords(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchWords();
  }, [selectedTopic]);

  // Xử lý form thay đổi
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Thêm từ mới (có order)
  const handleAdd = async e => {
    e.preventDefault();
    if (!selectedTopic) return;
    const maxOrder = words.length > 0 ? Math.max(...words.map(w => w.order || 0)) : 0;
    const order = maxOrder + 1;
    await addDoc(collection(db, "topics", selectedTopic.id, "word"), { ...form, order });
    setForm({ word: "", pronunciation: "", translation: "", example: "" });
    setShowAdd(false);
    const snap = await getDocs(collection(db, "topics", selectedTopic.id, "word"));
    setWords(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Xóa từ
  const handleDelete = async id => {
    if (!selectedTopic) return;
    await deleteDoc(doc(db, "topics", selectedTopic.id, "word", id));
    setWords(words.filter(w => w.id !== id));
  };

  // Sửa từ
  const handleEdit = idx => {
    setEditIdx(idx);
    setForm(words[idx]);
  };

  // Lưu từ đã sửa
  const handleUpdate = async e => {
    e.preventDefault();
    const wordId = words[editIdx].id;
    await updateDoc(doc(db, "topics", selectedTopic.id, "word", wordId), form);
    setEditIdx(null);
    setForm({ word: "", pronunciation: "", translation: "", example: "" });
    const snap = await getDocs(collection(db, "topics", selectedTopic.id, "word"));
    setWords(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Thêm chủ đề (có order)
  const handleAddTopic = async e => {
    e.preventDefault();
    const maxOrder = topics.length > 0 ? Math.max(...topics.map(t => t.order || 0)) : 0;
    const order = maxOrder + 1;
    await addDoc(collection(db, "topics"), { ...topicForm, order });
    setTopicForm({ name: "", image: "", slug: "" });
    setShowAddTopic(false);
    const snap = await getDocs(collection(db, "topics"));
    setTopics(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Sửa chủ đề
  const handleEditTopic = idx => {
    setEditTopicIdx(idx);
    setTopicForm({
      name: topics[idx].name || "",
      image: topics[idx].image || "",
      slug: topics[idx].slug || ""
    });
    setShowAddTopic(false);
  };

  // Lưu chủ đề đã sửa
  const handleUpdateTopic = async e => {
    e.preventDefault();
    const topicId = topics[editTopicIdx].id;
    await updateDoc(doc(db, "topics", topicId), topicForm);
    setEditTopicIdx(null);
    setTopicForm({ name: "", image: "", slug: "" });
    const snap = await getDocs(collection(db, "topics"));
    setTopics(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Xóa chủ đề
  const handleDeleteTopic = async id => {
    if (window.confirm("Bạn có chắc muốn xóa chủ đề này?")) {
      await deleteDoc(doc(db, "topics", id));
      setTopics(topics.filter(t => t.id !== id));
      if (selectedTopic?.id === id) setSelectedTopic(null);
    }
  };

  return (
    <div className="admin-container">
      <h2>Quản lý chủ đề và từ vựng</h2>
      <div className="admin-flex">
        {/* Danh sách chủ đề */}
        <div className="admin-topic-list">
          <h3>Chủ đề</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button
              className={topicSort === "order" ? "admin-sort-btn active" : "admin-sort-btn"}
              onClick={() => setTopicSort("order")}
              type="button"
            >
              Theo thời gian thêm
            </button>
            <button
              className={topicSort === "alpha" ? "admin-sort-btn active" : "admin-sort-btn"}
              onClick={() => setTopicSort("alpha")}
              type="button"
            >
              Theo A-Z
            </button>
          </div>
          <button
            className="admin-add-btn"
            onClick={() => { setShowAddTopic(true); setEditTopicIdx(null); setTopicForm({ name: "", image: "", slug: "" }); }}
            style={{ marginBottom: 8 }}
          >
            + Thêm chủ đề
          </button>
          {/* Form thêm/sửa chủ đề */}
          {(showAddTopic || editTopicIdx !== null) && (
            <form className="admin-topic-form" onSubmit={editTopicIdx !== null ? handleUpdateTopic : handleAddTopic}>
              <input
                name="name"
                placeholder="Tên chủ đề"
                value={topicForm.name}
                onChange={e => setTopicForm({ ...topicForm, name: e.target.value })}
                required
              />
              <input
                name="image"
                placeholder="Link ảnh (image)"
                value={topicForm.image}
                onChange={e => setTopicForm({ ...topicForm, image: e.target.value })}
                required
              />
              <input
                name="slug"
                placeholder="Slug (không dấu, viết liền, ví dụ: travel)"
                value={topicForm.slug}
                onChange={e => setTopicForm({ ...topicForm, slug: e.target.value })}
                required
              />
              <button type="submit" className="admin-save-btn">
                {editTopicIdx !== null ? "Lưu" : "Thêm"}
              </button>
              <button type="button" className="admin-cancel-btn" onClick={() => { setShowAddTopic(false); setEditTopicIdx(null); setTopicForm({ name: "", image: "", slug: "" }); }}>
                Hủy
              </button>
            </form>
          )}
          <ul>
            {topics
              .slice()
              .sort((a, b) =>
                topicSort === "alpha"
                  ? (a.name || "").localeCompare(b.name || "")
                  : (a.order || 0) - (b.order || 0)
              )
              .map((topic, idx) => (
                <li
                  key={topic.id}
                  className={selectedTopic?.id === topic.id ? "selected" : ""}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <span className="topic-order">{idx + 1}.</span>
                  <span className="topic-name">{topic.name}</span>
                  <button className="admin-edit-btn" onClick={e => { e.stopPropagation(); handleEditTopic(idx); }}>Sửa</button>
                  <button className="admin-delete-btn" onClick={e => { e.stopPropagation(); handleDeleteTopic(topic.id); }}>Xóa</button>
                </li>
            ))}
          </ul>
        </div>
        {/* Danh sách từ vựng */}
        <div className="admin-word-list">
          {selectedTopic ? (
            <>
              <h3>
                Từ vựng chủ đề: <span className="admin-topic-name">{selectedTopic.name}</span>
              </h3>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button
                  className={wordSort === "order" ? "admin-sort-btn active" : "admin-sort-btn"}
                  onClick={() => setWordSort("order")}
                  type="button"
                >
                  Theo thời gian thêm
                </button>
                <button
                  className={wordSort === "alpha" ? "admin-sort-btn active" : "admin-sort-btn"}
                  onClick={() => setWordSort("alpha")}
                  type="button"
                >
                  Theo A-Z
                </button>
              </div>
              <button
                className="admin-add-btn"
                onClick={() => { setShowAdd(true); setEditIdx(null); setForm({ word: "", pronunciation: "", translation: "", example: "" }); }}
              >
                + Thêm từ mới
              </button>
              {/* Form thêm/sửa */}
              {(showAdd || editIdx !== null) && (
                <form className="admin-word-form" onSubmit={editIdx !== null ? handleUpdate : handleAdd}>
                  <input name="word" placeholder="Từ vựng" value={form.word} onChange={handleChange} required />
                  <input name="pronunciation" placeholder="Phiên âm" value={form.pronunciation} onChange={handleChange} required />
                  <input name="translation" placeholder="Nghĩa" value={form.translation} onChange={handleChange} required />
                  <input name="example" placeholder="Ví dụ" value={form.example} onChange={handleChange} />
                  <button type="submit" className="admin-save-btn">
                    {editIdx !== null ? "Lưu" : "Thêm"}
                  </button>
                  <button type="button" className="admin-cancel-btn" onClick={() => { setShowAdd(false); setEditIdx(null); setForm({ word: "", pronunciation: "", translation: "", example: "" }); }}>
                    Hủy
                  </button>
                </form>
              )}
              {/* Danh sách từ */}
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Từ vựng</th>
                    <th>Phiên âm</th>
                    <th>Nghĩa</th>
                    <th>Ví dụ</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {words
                    .slice()
                    .sort((a, b) =>
                      wordSort === "alpha"
                        ? (a.word || "").localeCompare(b.word || "")
                        : (a.order || 0) - (b.order || 0)
                    )
                    .map((w, idx) => (
                      <tr key={w.id}>
                        <td>{idx + 1}</td>
                        <td>{w.word}</td>
                        <td>{w.pronunciation}</td>
                        <td>{w.translation}</td>
                        <td>{w.example}</td>
                        <td>
                          <button className="admin-edit-btn" onClick={() => handleEdit(idx)}>Sửa</button>
                          <button className="admin-delete-btn" onClick={() => handleDelete(w.id)}>Xóa</button>
                        </td>
                      </tr>
                  ))}
                  {words.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>Chưa có từ vựng nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <div>Chọn một chủ đề để xem và quản lý từ vựng.</div>
          )}
        </div>
      </div>
    </div>
  );
}