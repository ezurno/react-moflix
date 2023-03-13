# ✨ **React-Movie 프로젝트** ✨

[React-Moflix](https://ezurno.github.io/react-moflix/)

React의 라이브러리를 활용한 영화사이트 만들기

<br/>

## 사용한 기술 🛠️

- styled-component
- react-icons
- framer-motion
- react-router-dom@5.3
- react-query
- [외부 API](https://www.themoviedb.org/)

<br/>
<hr/>

> ## **네비게이션 바**

<br/>
<br/>
<img src ="md_resources\resource_10.png" height="100"/>
<br/>
<br/>

- **LOGO** 와 영화, TV 쇼 탭이 있으며 각 탭을 누르면 각 탭에 맞는 영상목록이 나옴
- scroll 의 값을 주시하여 특정 수치 이상 내려오면 네비게이션 바가 까맣게 변함

```TS
const navVarient: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },

  scrolled: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

/*----- 중략 ------*/

  useMotionValueEvent(scrollY, "change", (value) => {
    // scrollY 가 변했을 때
    if (80 < scrollY.get()) {
      navAnimation.start("scrolled");
    } else {
      navAnimation.start("top");
    }
  }); // framer-motion 에서 지원하는 scroll 값 출력

```

<br/>
<br/>
<p>
<img src ="md_resources\resource_7.png" height="50"/>
<img src ="md_resources\resource_6.png" height="50"/>
</p>

- **LOGO** 에 마우스를 가져다 대면 svg 애니메이션이 나오며 깜빡이는 효과를 줌
- 클릭 시 제일 첫 화면인 **Movie** 창으로 이동

<br/>

```CSS
transition: {repeat: Infinity}
```

- 애니메이션을 무한반복

<br/>

<br/>
<hr/>

> ## **메인 화면**

<br/>
<br/>
<img src ="md_resources\resource_1.png" height="400"/>
<br/>
<br/>

- 메인화면에 API 내 제일 첫 영상을 띄워줌
- 제목과 줄거리를 간략하게 읊어줌

<br/>
<br/>
<img src ="md_resources\resource_4.png" height="400"/>
<br/>
<br/>

- **Info** 버튼을 누르면 상세 정보를 볼 수 있음
- 영화의 포스터, 평점, 배우와 감독의 정보, 상영한 날짜를 알 수 있음

<br/>
<hr/>

> ## **영화 리스트**

<br/>
<br/>
<img src ="md_resources\resource_11.png" height="400"/>
<img src ="md_resources\resource_12.png" height="400"/>
<br/>
<br/>

- **Now Playing** , **Top Rank**, **Update**, **Popular** 로 리스트를 따로 보여줌
- 우측의 화살표를 누르면 **Slide** 되는 애니메이션으로 목록이 넘어감

<br/>
<hr/>

> ## **검색**

<br/>
<br/>
<img src ="md_resources\resource_3.png" height="200"/>
<br/>
<br/>

- 상단 네비게이션 바 우측에 **Search Bar**
- 검색을 하면 API 서버에 요청해 **TV show** 와 **Movie** 의 일치하는 값을 찾아옴

<br/>
<br/>
<p>
<img src ="md_resources\resource_8.png" height="200"/>
<img src ="md_resources\resource_9.png" height="200"/>
</p>
<br/>

- **"batman"** 을 검색한 모습
- TV show 와 Movie 내 일치하는 영상들을 뽑아서 나열 함

<br/>
<hr/>

> ## **그 외**

<br/>
<br/>
<img src ="md_resources\resource_5.png" height="200"/>
<br/>
<br/>

- 하단의 **Footer** 를 생성
- [GitHub](https://ezurno.github.io/react-moflix/) 링크로 연결 되는 GitHub icon을 생성

- 깔끔해보이게 하기 위해 **Scroll Bar**를 없애버림 (정상 작동)

<br/>

```CSS
::-webkit-scrollbar {
display: none;
}
```
