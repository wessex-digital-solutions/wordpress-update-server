export interface Plugin {
  /**
   * The name of the plugin.
   */
  name?: string;
  /**
   * The version of the plugin.
   */
  version?: string;
  /**
   * The description of the plugin.
   */
  description?: string;
  /**
   * The author of the plugin.
   */
  author?: string;
  /**
   * The url of the plugin.
   */
  homepage?: string;
  /**
   * The license of the plugin.
   */
  license?: string;
  /**
   * The plugin's keywords.
   */
  keywords?: string[];
  /**
   * The plugin's repository.
   */
  repository?: string;
}
