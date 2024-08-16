
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

const InnoscriptaSkeleton: React.FC<SkeletonProps> = (props) => {
  const { variant } = props;

  return <Skeleton variant={variant || 'rounded'} {...props} />;
};

export default InnoscriptaSkeleton;
