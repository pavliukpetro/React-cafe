import { useSelector } from 'react-redux';
import AccountLayout from '../../components/Account/AccountLayout';

export default function Orders() {
    const user = useSelector(state => state.user);

    return (
        <AccountLayout>
            <h1>Orders</h1>
        </AccountLayout>
    );
}
