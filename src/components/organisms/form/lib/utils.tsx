import { FieldValues, Path } from 'react-hook-form'
import FormWatchConsumer, {
  WatchedValuesChangeHandler,
} from '../components/form-watch-consumer'
import { ReactElement } from 'react'

export const buildFormWatchConsumer = <T extends FieldValues, TProps>(
  watchedValues: ReadonlyArray<Path<T>>,
  onWatchedValuesChange: WatchedValuesChangeHandler<T>,
  element: (props: TProps) => ReactElement,
) => {
  return (props: TProps) => {
    return (
      <FormWatchConsumer
        watchedValues={watchedValues}
        onWatchedValuesChange={onWatchedValuesChange}
      >
        {element(props)}
      </FormWatchConsumer>
    )
  }
}
