import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./UserManager.css";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [userRoleEditIdx, setUserRoleEditIdx] = useState(null);
  const [userRole, setUserRole] = useState("");

  // Load users
  useEffect(() => {
    async function fetchUsers() {
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchUsers();
  }, []);

  // Đổi vai trò user
  const handleEditUserRole = (idx) => {
    setUserRoleEditIdx(idx);
    setUserRole(users[idx].role || "user");
  };

  const handleSaveUserRole = async (idx) => {
    const user = users[idx];
    await setDoc(doc(db, "users", user.id), { ...user, role: userRole });
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setUserRoleEditIdx(null);
  };

  // Xóa user
  const handleDeleteUser = async (idx) => {
    const user = users[idx];
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      await deleteDoc(doc(db, "users", user.id));
      setUsers(users.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="admin-container">
      <h2>Quản lý người dùng</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Tên</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.email}</td>
              <td>{user.displayName || ""}</td>
              <td>
                {userRoleEditIdx === idx ? (
                  <select value={userRole} onChange={e => setUserRole(e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  user.role || "user"
                )}
              </td>
              <td>
                {userRoleEditIdx === idx ? (
                  <>
                    <button className="admin-save-btn" onClick={() => handleSaveUserRole(idx)}>Lưu</button>
                    <button className="admin-cancel-btn" onClick={() => setUserRoleEditIdx(null)}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button className="admin-edit-btn" onClick={() => handleEditUserRole(idx)}>Đổi vai trò</button>
                    <button className="admin-delete-btn" onClick={() => handleDeleteUser(idx)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>Chưa có người dùng nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}