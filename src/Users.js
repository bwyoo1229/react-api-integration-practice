import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

// LOADING, SUCCESS, ERROR
function asyncReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

function Users(props) {
  const [state, dispatch] = useReducer(asyncReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (error) {
      dispatch({ type: 'ERROR', error: error });
    }
  };

  // 가장 처음으로 렌더링 될때 axios를 이용
  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state;
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
