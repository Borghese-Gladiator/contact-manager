import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/ContactPage.module.css'
import { Button } from "antd"
// custom components
import UserList from '../src/pageComponents/UserList';
import UserTable from '../src/pageComponents/UserTable';
// icons
import { BiTable } from 'react-icons/bi';
import { BsCardHeading } from 'react-icons/bs';

export default function ContactsPage({ userList = [], setUserList }) {
  const [isTableView, setIsTableView] = useState(false);
  const toggleTableView = () => setIsTableView(true);
  const toggleCardView = () => setIsTableView(false);
  const deleteUser = (id) => {
    setUserList(userList.filter((t) => t.id !== id))
  }
  const deleteUserList = (idList) => {
    setUserList(userList.filter((user) => !idList.includes(user.id)))
  }

  return (
    <div>
      <Head>
        <title>View Contacts | Contact Manager</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="react, contact, manager" />
        <meta name="author" content="Borghese-Gladiator" />
        <meta name="description" content="Quick utility to track people I talked to and how long ago it was. I built this since existing solutions I found were CRM tools (but I'm just talking to people for fun)." />
        <meta name="audience" content="Everyone" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Contacts
        </h1>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }} />
          <div style={{ alignSelf: "flex-end" }}>
            <Button onClick={toggleTableView} type={`${isTableView ? "primary" : ""}`}><BiTable />Table</Button>
            <Button onClick={toggleCardView} type={`${isTableView ? "" : "primary"}`}><BsCardHeading />Cards</Button>
          </div>
        </div>
        {
          isTableView
            ? <UserTable userList={userList} deleteUser={deleteUser} />
            : <UserList userList={userList} setUserList={setUserList} />
        }
      </main>
    </div>
  )
}