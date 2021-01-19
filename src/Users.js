import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users(props) {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setUsers(null);
      setError(null);
      setLoading(true);

      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );

      // 데이터 값 조회
      setUsers(response.data);
    } catch (error) {
      setError(error.response.status);
    }

    setLoading(false);
  };

  // 가장 처음으로 렌더링 될때 axios를 이용
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null; // null 반환시 아무것도 안보여주는 것이다.

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>버튼</button>
    </>
  );
}

export default Users;
