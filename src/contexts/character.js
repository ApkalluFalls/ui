/**
 * The character context controls the actively tracked character.
 * @module [{contexts}character]
 * @default character.none
 * @example import { CharacterContext, character } from "context/theme";
 */
import React from "react";

/**
 * The `character` object contains the currently-tracked character information.
 */
export const character = {
  none: {

  }
};

/**
 * `CharacterContext` is the context API for characters.
 */
export const CharacterContext = React.createContext({});