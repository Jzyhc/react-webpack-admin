import React, { useState, Suspense, lazy } from "react";
import smallImg from "@/assets/image/vite.jpeg";
import { Demo1, Demo2 } from "@/components";
const LazyDemo = lazy(() => import("@/components/LazyDemo"));

// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      "@/components/PreFetchDemo"
    )
);
// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      "@/components/PreloadDemo"
    )
);

function App() {
  const [count, setCounts] = useState("");
  const [show, setShow] = useState(false);

  const onClick = () => {
    // import("./app.css");
    setShow(true);
  };
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };
  return (
    <>
      <h2>webpack5+react+ts</h2>
      <Demo2></Demo2>
      <img src={smallImg} alt="小于10kb的图片" />

      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      {show && (
        <Suspense fallback={null}>
          <LazyDemo />
        </Suspense>
      )}
      {show && (
        <>
          <Suspense fallback={null}>
            <PreloadDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreFetchDemo />
          </Suspense>
        </>
      )}
    </>
  );
}
export default App;
