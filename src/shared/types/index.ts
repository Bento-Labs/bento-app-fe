/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentPropsWithoutRef, ElementType } from "react";

export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

interface AsProp<E extends ElementType> {
  as?: E;
}

export type PolymorphicProps<
  E extends ElementType,
  P = Record<string, unknown>,
> = AsProp<E> &
  DistributiveOmit<ComponentPropsWithoutRef<E>, keyof AsProp<E> | keyof P> &
  P;
