declare module "alea" {
  const alea: (seed: number | string) => () => number;
  export default alea;
}
