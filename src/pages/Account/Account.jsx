import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import AccountLayout from '../../components/Account/AccountLayout';

export default function Account() {
    const user = useSelector(state => state.user);

    return (
        <AccountLayout>
            <h1 className='mb-4'>My account</h1>
            <Avatar className='mb-3'>{user.name}</Avatar>
            <div className='mb-3'>Name: {user.name}</div>
            <div>Email: {user.email}</div>
        </AccountLayout>
    );
}
