import { ReactNode } from 'react';

const Layout = (props: {children: ReactNode, test: ReactNode}) => {
  return (
    <section>
      {props.children}
      <div>
        {props.test}
      </div>
    </section>
  );
};

export default Layout;
