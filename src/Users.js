import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

// callback으로 넣어줄 함수
async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

function Users() {
  const [state, fetchData] = useAsync(getUsers, [], true);
  const [userId, setUserId] = useState(null);

  const { loading, data: users, error } = state;
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>; // null 반환시 아무것도 안보여주는 것이다.

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
