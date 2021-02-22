interface PageHeaderProps {
  titleText: string;
}

const PageHeader = ({ titleText }: PageHeaderProps): any => (
  <div className="row text-center">
    <div className="col-12 mt-4">
      <h1>{titleText}</h1>
    </div>
  </div>
);

export default PageHeader;
