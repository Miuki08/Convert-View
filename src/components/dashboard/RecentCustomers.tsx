import Image from 'next/image';

interface Customer {
  id: number;
  name: string;
  userId: string;
  avatar: string;
  status: 'paid' | 'pending';
}

const RecentCustomers = () => {
  const customers: Customer[] = [
    {
      id: 1,
      name: 'Samantha Melon',
      userId: '#1234',
      avatar: '/assets/images/faces/2.jpg',
      status: 'paid'
    },
    {
      id: 2,
      name: 'Allie Grater',
      userId: '#1234',
      avatar: '/assets/images/faces/1.jpg',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Gabe Lackmen',
      userId: '#1234',
      avatar: '/assets/images/faces/5.jpg',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Manuel Labor',
      userId: '#1234',
      avatar: '/assets/images/faces/7.jpg',
      status: 'paid'
    },
    {
      id: 5,
      name: 'Hercules Bing',
      userId: '#1754',
      avatar: '/assets/images/faces/9.jpg',
      status: 'paid'
    },
    {
      id: 6,
      name: 'Manuel Labor',
      userId: '#1234',
      avatar: '/assets/images/faces/11.jpg',
      status: 'pending'
    }
  ];

  return (
    <div className="card overflow-hidden">
      <div className="card-header pb-3">
        <h3 className="card-title mb-2 text-lg font-semibold">Recent Customers</h3>
      </div>
      <div className="card-body p-0 customers mt-1">
        <div className="list-group list-lg-group list-group-flush">
          {customers.map((customer) => (
            <a
              key={customer.id}
              href="javascript:void(0);"
              className="border-0 list-group-item list-group-item-action p-3 border-0"
            >
              <div className="media mt-0 flex items-center">
                <div className="me-3 flex-shrink-0">
                  <Image
                    className="avatar-lg rounded-circle me-3 my-auto shadow"
                    src={customer.avatar}
                    alt="Customer image"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="media-body flex-fill">
                  <div className="d-flex align-items-center">
                    <div className="mt-0">
                      <h5 className="mb-1 text-sm font-semibold text-dark">{customer.name}</h5>
                      <p className="mb-0 text-xs text-muted">User ID: {customer.userId}</p>
                    </div>
                    <span className="ms-auto wd-45p text-sm">
                      <span
                        className={`float-end badge ${
                          customer.status === 'paid'
                            ? 'bg-success-transparent'
                            : 'bg-danger-transparent'
                        }`}
                      >
                        <span
                          className={`op-7 ${
                            customer.status === 'paid' ? 'text-success' : 'text-danger'
                          } font-semibold`}
                        >
                          {customer.status}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentCustomers;