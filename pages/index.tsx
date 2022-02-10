/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import React, { Component, FunctionComponent } from 'react';
import Head from 'next/head';
import styles from '../styles/Q.module.css';
import axios from 'axios';

type NavItem = {
  target: string,
  emoji: string,
  text: string,
  content?: any
}

type HomeProps = {
  nav: Array<NavItem>
}

type NavState = {
  shown: boolean
}

type GridItem = {
  url: string,
  img: string,
  title: string,
  desc: string,
}

type GridState = {
  items: Array<GridItem>,
  loaded: boolean
}

//const icon = (<link rel="icon" href="/favicon.png" />);

class Grid extends Component<{}, GridState> {
  constructor(props: {}) {
    super(props);
    this.state = {items: [], loaded: false}
  }

  componentDidMount() {
    axios
      .get("/api/projects")
      .then((res) => {
        if(res.data != null) {
          this.setState({items: res.data, loaded: true});
        }
      });
  }

  render() {
    return (<div className={styles.grid}>
      {this.state.loaded ? this.state.items.map((i, index) => (
        <div key={index} className={styles.item}>
          <img src={i.img} alt={i.desc}/>
          <b>{i.title}</b><br/>
          <span>{i.desc}</span><br/>
          <a href={i.url}>More...</a>
        </div>
      )) : <p>Loading...</p>}
    </div>);
  }
}

const HomePage: FunctionComponent<HomeProps> = ({nav}) => (
  <div className={styles.wrapper}>
    <main>
      <div className={styles.head}><h1>
        <span>Hey! I&apos;m&nbsp;</span>
        <div className={styles.name}>Andrew Li<div className={styles.underline}></div></div>&nbsp;
        <span className={styles.emoji}>👋</span>
      </h1></div>
      <section className={styles.bio} id="bio"><p>I have a diverse range of interests, all of which involve human computer interaction, or how we interact with the technology around us. On this website, you can learn more about who I am and the things that I do.</p></section>
      <section className={styles.contents} id="contents">
        <div className={styles.inline_navlist}>
          {nav.map((i: NavItem, index: number) => (
            <div className={styles.item} key={index}><a href={i.target}><span className={styles.emoji}>{i.emoji}</span> <span>{i.text}</span></a></div>
          ))}
        </div>
        <hr/>
      </section>

      {nav.map((i: NavItem, index: number) => (
        <section key={index} id={i.target.substring(1)}>
          <h3>{i.emoji}&nbsp;{i.text}</h3>
          {i.content}
        </section>
      ))}
    </main>
  </div>
);

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.footer}>
      <span>Powered by <b>Next</b></span>
      <span>Written in <b>TypeScript</b></span>
      <span>Hosted on <b>DigitalOcean</b></span>
    </div>  
  );
}

class NavBar extends Component<HomeProps, NavState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      shown: false
    };
  }
  
  render() {
    return (
      <div className={styles.nav}><div className={this.state.shown ? styles.patty : styles.hamburger} onClick={(event) => this.setState({shown: !this.state.shown})}>
        <span></span>
        <span></span>
        <span></span>

        {this.state.shown ? (<div className={styles.navlist}>
          {this.props.nav.map((i: NavItem, index: number) => (
            <div className={styles.item} key={index}><a href={i.target}><b className={styles.emoji}>{i.emoji}</b> {i.text}</a></div>
          ))}
        </div>) : (<></>)}
      </div></div>
    );
  }
}

const Home: NextPage = () => {
  let content = [
    {text: "About Me", emoji: "🙋🏻", target: "#about", content: (<>
      <p>Hello! I&apos;m Andrew Li, a Chinese-American high school senior from Seattle, WA. In college, I seek to major in human computer interaction and minor in public policy, for I believe that understanding how policy implements science ideas is a prerequisite to solving world problems.</p>
      <p>I spend most of my free time either playing open-world games, researching and learning about certain policy areas (both domestic and international), or working on coding projects.</p>
      <p>In terms of coding, I&apos;m fluent in <b>JavaScript, TypeScript, React.js, Next.js, Express.js, HTML, CSS, Java, Python, and Swift</b>. You&apos;ll notice that most of these are based on JavaScript, the language I have the most experience in. Though, don&apos;t judge–my first language was Java, then Python and Swift. I learned these through developing mobile apps and analyzing data for school, but found them too restricting, leading me to self-learn frontend development and thus all of these variants of JS.</p>
      <p>I can also do graphic design, being experienced in Adobe InDesign and Illustrator. I&apos;m not the best artist, but I can work with vectors (because let&apos;s be real, it&apos;s just math).</p>
      </>)},
    {text: "Coding Projects", emoji: "🖥", target: "#code", content: (<>
      <p>My best coding projects are on my GitHub page. Below are some featured repositories:</p>
      <Grid/>
    </>)},
    {text: "Photography", emoji: "📸", target: "#photos", content: (<>
      <p>One of my goals is to take a picture of the Welcome To sign on the border of every state in the US except Alaska and Hawaii, combined with an album of photos from each state. However, I haven&apos;t started this project yet, so this section is empty for now...</p>
    </>)},
    {text: "Contact Me", emoji: "✉️", target: "#contact", content: (<>
      <p><a href="mailto:andrewli06@icloud.com"><b>Email</b> - andrewli06@icloud.com</a></p>
      <p><a href="https://github.com/andrewli06"><b>GitHub</b> - @andrewli06</a></p>
      <p><a href="https://www.linkedin.com/in/andrew-li-41778a223/"><b>LinkedIn</b> - Andrew Li</a></p>
    </>)}
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Andrew Li</title>
        <meta name="description" content="Andrew Li is a software engineering student studying human computer interaction." />
      </Head>

      <NavBar nav={content}/>
      <HomePage nav={content}/>
      <Footer/>
    </div>
  );
}

export default Home;
