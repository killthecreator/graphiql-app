import React from "react";
import ContentLoader from "react-content-loader";

const GraphqlResponseSkeleton = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="20" y="2" rx="3" ry="3" width="88" height="19" />
    <rect x="20" y="58" rx="3" ry="3" width="324" height="20" />
    <rect x="20" y="87" rx="3" ry="3" width="178" height="20" />
    <rect x="20" y="116" rx="3" ry="3" width="153" height="20" />
    <rect x="20" y="30" rx="3" ry="3" width="171" height="20" />
  </ContentLoader>
);

export default GraphqlResponseSkeleton;
